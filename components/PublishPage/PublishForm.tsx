import { FormEvent, useCallback, useEffect, useContext, useState } from 'react'
import { ethers } from 'ethers'
import type { TransactionResponse } from '@ethersproject/abstract-provider'

import FileUpload from '@/components/FileUpload'

import { GlobalContext } from '@/context/GlobalContext'
import { PublishContext, BlockReceipt } from '@/context/PublishContext'
import { resolver } from '@/utils/async'

interface EthersError {
  data?: Error
  message: string
}

const PublishForm = () => {
  const { apiHost } = useContext(GlobalContext)
  const {
    account,
    blockConfig,
    contract,
    price,
    setBlockReceipt,
    setStep,
    step,
  } = useContext(PublishContext)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [progressMessage, setProgressMessage] = useState('')
  const [error, setError] = useState<Error | null>(null)
  const [receipt, setReceipt] = useState<Partial<BlockReceipt>>({})

  const compileBlock = useCallback(
    async (formElement: HTMLFormElement) => {
      const formData = new FormData(formElement)
      formData.set('block', JSON.stringify(blockConfig))

      if (coverFile) {
        formData.append('image', coverFile)
      }

      setReceipt((prevState) => ({
        ...prevState,
        name: (formData.get('name') as string) || '',
        description: (formData.get('description') as string) || '',
        tags: (formData.get('tags') as string) || '',
      }))

      // TODO: validation
      const [error, result] = await resolver(
        fetch(`${apiHost}/blocks/compile`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          referrerPolicy: 'origin',
          body: formData,
        }).then((resp) => {
          if (resp.ok) {
            return resp.json()
          }
        })
      )

      if (error || result === undefined) {
        const msg = error?.message || 'An unexpected error occurred.'
        throw new Error(msg)
      }

      return result
    },
    [blockConfig, coverFile]
  )

  const mintBlock = useCallback(
    async (cid: string, metadataURI: string) => {
      if (contract && price) {
        contract.once(
          'BUIBlockPublished',
          (cid: string, blockProps: { [key: string]: any }) => {
            setReceipt((prevState) => {
              if (prevState.cid === cid) {
                return {
                  ...prevState,
                  tokenId: blockProps.tokenId.toNumber(),
                }
              }

              return prevState
            })
          }
        )

        const [error, tx] = await resolver<TransactionResponse>(
          contract.publish(cid, metadataURI, {
            value: ethers.utils.parseEther(price),
          })
        )
        if (error) {
          const err = error as EthersError
          let msg =
            err.data?.message || err.message || 'An unexpected error occurred.'

          if (msg.toLowerCase().includes('insufficient funds')) {
            msg = 'Insufficient funds to publish'
          }

          throw new Error(msg)
        }

        return tx
      }
    },
    [contract, price]
  )

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError(null)

      if (account && contract) {
        setProgressMessage('Compiling...')
        setStep(1)

        const [compErr, compRes] = await resolver(
          compileBlock(event.currentTarget)
        )

        if (compErr) {
          setError(compErr)
          setProgressMessage('')
          setStep(0)
          return
        }

        setReceipt((prevState) => ({
          ...prevState,
          ...compRes,
        }))

        setProgressMessage('Minting...')
        const [mintErr, tx] = await resolver(
          mintBlock(compRes.cid, compRes.metadataURI)
        )
        if (mintErr) {
          console.log(mintErr)
          setError(mintErr)
          setStep(0)
          setProgressMessage('')
          return
        }
        setProgressMessage('Confirming your transaction...')

        const txReceipt = await (tx as TransactionResponse).wait()
        setReceipt((prevState) => ({
          ...prevState,
          txHash: txReceipt.transactionHash,
          gasUsed: txReceipt.gasUsed,
        }))
      }
    },
    [account, contract, compileBlock, mintBlock, setStep]
  )

  useEffect(() => {
    if (receipt.txHash !== undefined) {
      setBlockReceipt(receipt as BlockReceipt)
      setStep(2)
    }
  }, [receipt, setBlockReceipt, setStep])

  useEffect(() => {
    if (coverFile) {
      const reader = new FileReader()
      reader.readAsDataURL(coverFile)
      reader.onload = () => {
        setReceipt((prevState) => ({
          ...prevState,
          coverURI: reader.result as string,
        }))
      }
      reader.onerror = () => {
        console.error(reader.error)
      }
    }
  }, [coverFile])

  return (
    <form
      className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
      onSubmit={handleSubmit}
    >
      <div className="mx-auto max-w-lg lg:max-w-none">
        <section aria-labelledby="publish-heading">
          <h2
            id="publish-heading"
            className="mb-4 text-2xl font-medium text-neutral-900"
          >
            Publish your Block
          </h2>
          <h2 className="text-lg font-medium text-neutral-900">
            Add some details for your Block NFT.
          </h2>
          <p className="mt-2 text-xs font-medium text-neutral-700">
            These details are saved as the metadata. Metadata helps marketplaces
            display information about your NFT.
          </p>
          <p className="mt-6 text-sm font-medium text-red-500">
            {error?.message}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  disabled={step > 0}
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-neutral-700"
              >
                Description
              </label>
              <div className="mt-1">
                <input
                  disabled={step > 0}
                  type="text"
                  id="description"
                  name="description"
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                />
              </div>
            </div>

            <FileUpload
              className="sm:col-span-3"
              label="Cover Image"
              name="file-upload"
              onChange={setCoverFile}
            />

            <div className="sm:col-span-3">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-neutral-700"
              >
                Tags
              </label>
              <div className="mt-1">
                <input
                  disabled={step > 0}
                  type="text"
                  id="tags"
                  name="tags"
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </section>
        <div className="mt-10 border-t border-neutral-200 pt-6 sm:flex sm:items-center sm:justify-between">
          <p>{progressMessage}</p>
          <button
            disabled={account === null || step > 0}
            type="submit"
            className="w-full rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50 disabled:cursor-not-allowed disabled:opacity-50 sm:order-last sm:ml-6 sm:w-auto"
          >
            {account === null ? 'Connect you wallet' : 'Publish'}
          </button>
          <p className="mt-4 text-center text-sm text-neutral-500 sm:mt-0 sm:text-left"></p>
        </div>
      </div>
    </form>
  )
}

export default PublishForm
