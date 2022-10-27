import { UserIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import type { NextPage } from 'next'
// import { useRouter } from 'next/router'
import Head from 'next/head'
import clsx from 'clsx'

import Header from 'components/Header'
import Logo from 'components/Logo'
import Footer from 'components/Footer'

const product = {
  name: 'MoonMail Contact Form',
  price: '0.33 ETH',
  images: [
    {
      id: 1,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt:
        'A simple MoonMail contact form block with some validation that you can embed in your website.',
      primary: true,
    },
  ],
  description: `
      <p>A simple MoonMail contact form block with some validation that you can embed in your website.</p>
    `,
  details: ['MoonMail integration', 'Fade transitions', 'Censorship resistant'],
}
const policies = [
  {
    name: 'Email support',
    icon: UserIcon,
    description: 'Email support for 1 year',
  },
]
const reviews = {
  average: 3.9,
  totalCount: 512,
  featured: [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
          <p>I was really pleased with the overall experience.</p>
          <p>The block quality is amazing, it works even better than I had anticipated. Brilliant stuff! I would gladly recommend this block to my friends. And, now that I think of it... I actually have, many times!</p>
        `,
      author: 'Jackie H',
      date: 'September 18, 2022',
      datetime: '2022-09-18',
    },
  ],
}
const relatedProducts = [
  {
    id: 1,
    name: 'MoonMail Contact Form',
    href: '/block/2',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt:
      'A simple MoonMail contact form block with some validation that you can embed in your website.',
    price: '0.33 ETH',
  },
]

const Block: NextPage = () => {
  //   const router = useRouter()
  //   const { id } = router.query

  return (
    <>
      <Head>
        <title>Decentralized UI software as an NFT – Blocks UI Protocol</title>
        <meta
          name="description"
          content="Providing an open and decentralized framework for building user interface software that is simple enough for anyone to use."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-neutral-900">
                {product.name}
              </h1>
              <p className="text-xl font-medium text-neutral-900">
                {product.price}
              </p>
            </div>
            {/* Reviews */}
            <div className="mt-4">
              <h2 className="sr-only">Reviews</h2>
              <div className="flex items-center">
                <p className="text-sm text-neutral-700">
                  {reviews.average}
                  <span className="sr-only"> out of 5 stars</span>
                </p>
                <div className="ml-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={clsx(
                        reviews.average > rating
                          ? 'text-yellow-400'
                          : 'text-neutral-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div
                  aria-hidden="true"
                  className="ml-4 text-sm text-neutral-300"
                >
                  ·
                </div>
                <div className="ml-4 flex">
                  <button className="text-sm font-medium text-neutral-600 hover:text-neutral-500">
                    See all {reviews.totalCount} reviews
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
              {product.images.map((image) => (
                // <img
                //   key={image.id}
                //   src={image.imageSrc}
                //   alt={image.imageAlt}
                //   className={clsx(
                //     image.primary
                //       ? 'lg:col-span-2 lg:row-span-2'
                //       : 'hidden lg:block',
                //     'rounded-lg'
                //   )}
                // />
                <Logo
                  key={image.id}
                  className={clsx(
                    image.primary
                      ? 'lg:col-span-2 lg:row-span-2'
                      : 'hidden lg:block',
                    'rounded-lg p-24'
                  )}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 lg:col-span-5">
            <form>
              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
              >
                Buy Now
              </button>
            </form>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-neutral-900">
                Description
              </h2>

              <div
                className="prose prose-sm mt-4 text-neutral-500"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
            <div className="mt-8 border-t border-neutral-200 pt-8">
              <h2 className="text-sm font-medium text-neutral-900">Features</h2>
              <div className="prose prose-sm mt-4 text-neutral-500">
                <ul role="list">
                  {product.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <section aria-labelledby="policies-heading" className="mt-10">
              <h2 id="policies-heading" className="sr-only">
                Our Policies
              </h2>
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {policies.map((policy) => (
                  <div
                    key={policy.name}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center"
                  >
                    <dt>
                      <policy.icon
                        className="mx-auto h-6 w-6 flex-shrink-0 text-neutral-400"
                        aria-hidden="true"
                      />
                      <span className="mt-4 text-sm font-medium text-neutral-900">
                        {policy.name}
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-500">
                      {policy.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
        <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
          <h2
            id="reviews-heading"
            className="text-lg font-medium text-neutral-900"
          >
            Recent reviews
          </h2>
          <div className="mt-6 space-y-10 divide-y divide-neutral-200 border-t border-b border-neutral-200 pb-10">
            {reviews.featured.map((review) => (
              <div
                key={review.id}
                className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
              >
                <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={clsx(
                            review.rating > rating
                              ? 'text-yellow-400'
                              : 'text-neutral-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-neutral-700">
                      {review.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                    <h3 className="text-sm font-medium text-neutral-900">
                      {review.title}
                    </h3>
                    <div
                      className="mt-3 space-y-6 text-sm text-neutral-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                  <p className="font-medium text-neutral-900">
                    {review.author}
                  </p>
                  <time
                    dateTime={review.datetime}
                    className="ml-4 border-l border-neutral-200 pl-4 text-neutral-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                  >
                    {review.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
          <h2
            id="related-heading"
            className="text-lg font-medium text-neutral-900"
          >
            Customers also purchased
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                  {/* <img
                    src={relatedProduct.imageSrc}
                    alt={relatedProduct.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  /> */}
                  <Logo className="h-full w-full object-cover object-center p-24 lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-neutral-700">
                      <a href={relatedProduct.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-neutral-900">
                    {relatedProduct.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Block
