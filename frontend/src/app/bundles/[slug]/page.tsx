"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const initialReviews = [
  {
    id: 1,
    name: "Sarah Khan",
    avatar: "/users/1.png",
    rating: 4.8,
    comment:
      "Absolutely love this table! The wood quality is excellent, and the chairs are super comfy. It fits perfectly in my dining space!",
    date: "02 February, 2025",
  },
  {
    id: 2,
    name: "Sarah Khan",
    avatar: "/users/2.png",
    rating: 4.8,
    comment:
      "Absolutely love this table! The wood quality is excellent, and the chairs are super comfy. It fits perfectly in my dining space!",
    date: "02 February, 2025",
  },
  {
    id: 3,
    name: "Sarah Khan",
    avatar: "/users/3.png",
    rating: 4.8,
    comment:
      "Absolutely love this table! The wood quality is excellent, and the chairs are super comfy. It fits perfectly in my dining space!",
    date: "02 February, 2025",
  },
];

const initialProduct = [
  {
    id: 13,
    name: "ComfiTable",
    image: "/home/features/1.png",
    monthlyPrice: 20,
    buyPrice: 150,
    rating: 4,
    category: ["best-selling", "trending-now"],
  },
  {
    id: 2,
    name: "ComfiTable",
    image: "/home/features/2.png",
    monthlyPrice: 20,
    buyPrice: 150,
    rating: 4,
    category: ["best-selling", "most-rented"],
  },
  {
    id: 3,
    name: "ComfiTable",
    image: "/home/features/3.png",
    monthlyPrice: 20,
    buyPrice: 150,
    rating: 4,
    category: ["most-rented", "trending-now"],
  },
  {
    id: 4,
    name: "ComfiTable",
    image: "/home/features/4.png",
    monthlyPrice: 20,
    buyPrice: 150,
    rating: 4,
    category: ["best-selling", "trending-now"],
  },
];

export default function ProductDetailsPage() {
  const [selectedOption, setSelectedOption] = useState<"rent" | "buy">("rent");
  const [quantity, setQuantity] = useState(2);
  const [rentalLength, setRentalLength] = useState("4 month");
  const [activeImage, setActiveImage] = useState(0);
  const [reviews, setReviews] = useState(initialReviews);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userRating === 0) {
      alert("Please select a rating");
      return;
    }

    if (reviewText.trim() === "") {
      alert("Please enter a review");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: reviews.length + 1,
        name: "You",
        avatar: "/avatars/default.jpg",
        rating: userRating,
        comment: reviewText,
        date: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      };

      setReviews([newReview, ...reviews]);
      setUserRating(0);
      setReviewText("");
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Product images
  const productImages = [
    "/shop/1.png",
    "/shop/2.png",
    "/shop/3.png",
    "/shop/1.png",
  ];

  const handleAddToCart = () => {
    alert(
      `Added to cart: ${quantity} Comfi Sofa(s) - ${
        selectedOption === "rent" ? `Rent for ${rentalLength}` : "Buy"
      }`
    );
  };

  const handleBuyNow = () => {
    alert(
      `Proceeding to checkout: ${quantity} Comfi Sofa(s) - ${
        selectedOption === "rent" ? `Rent for ${rentalLength}` : "Buy"
      }`
    );
  };

  return (
    <div className='min-h-screen'>
      <div className='bg-[#FFFFFF] pt-5'>
        <h1 className='text-2xl md:text-[32px] text-[#333333] font-medium text-center mb-8'>
          Bundles Offer Details
        </h1>
      </div>
      <div className='bg-[#FFF8ED]'>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
            {/* Product Images */}
            <div>
              <div className='bg-[#F5F5F5] rounded-md mb-4 relative aspect-square'>
                <Image
                  src={productImages[activeImage] || "/placeholder.svg"}
                  alt='Comfi Sofa'
                  fill
                  className='object-contain p-4'
                  priority
                />
              </div>
              <div className='flex space-x-2 overflow-x-auto pb-2'>
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      "bg-[#F5F5F5] border-2 rounded-md overflow-hidden flex-shrink-0 w-[132px] h-[132px] relative",
                      activeImage === index
                        ? "border-yellow-500"
                        : "border-transparent"
                    )}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Comfi Sofa view ${index + 1}`}
                      width={132}
                      height={132}
                      className='object-cover'
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className='flex justify-between items-start mb-2'>
                <h2 className='text-2xl md:text-[32px] text-[#101010] font-medium'>
                  Comfi Sofa
                </h2>
                <div className='flex items-center'>
                  <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                  <span className='ml-1 text-lg text-[#000000]'>4.8</span>
                </div>
              </div>

              <p className='text-[#333333] text-lg mb-6'>
                Transform your living space with a stylish and comfortable set
                that includes:
              </p>

              {/* Pricing Options */}
              <div className='mb-6'>
                <div className='flex space-x-4 mb-4'>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='pricing'
                      checked={selectedOption === "rent"}
                      onChange={() => setSelectedOption("rent")}
                      className='hidden'
                    />
                    <span
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                        selectedOption === "rent"
                          ? "border-yellow-500 bg-white"
                          : "border-gray-300 bg-white"
                      )}
                    >
                      {selectedOption === "rent" && (
                        <span className='w-3 h-3 rounded-full bg-yellow-500'></span>
                      )}
                    </span>
                    <span className='border border-yellow-500 rounded-md py-2 px-4 flex items-center'>
                      <span className='w-4 h-4 rounded-full bg-yellow-500 text-xl text-[#333333] mr-2'></span>
                      Rent $50{" "}
                      <span className='text-sm text-[#333333]'>/mo</span>
                    </span>
                  </label>

                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='pricing'
                      checked={selectedOption === "buy"}
                      onChange={() => setSelectedOption("buy")}
                      className='hidden'
                    />
                    <span
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                        selectedOption === "buy"
                          ? "border-yellow-500 bg-white"
                          : "border-gray-300 bg-white"
                      )}
                    >
                      {selectedOption === "buy" && (
                        <span className='w-3 h-3 rounded-full bg-yellow-500'></span>
                      )}
                    </span>
                    <span className='text-xl text-[#333333]'>$150 To buy</span>
                  </label>
                </div>

                {selectedOption === "rent" && (
                  <div className='bg-[#FFFFFF] p-4 rounded-md mb-6'>
                    <div className='flex items-center mb-4'>
                      <span className='w-4 h-4 rounded-full bg-yellow-500 mr-2'></span>
                      <span>Rent for $50/mo</span>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label
                          htmlFor='quantity'
                          className='block text-sm text-gray-600 mb-1'
                        >
                          Quantity
                        </label>
                        <select
                          id='quantity'
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500'
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor='rental-length'
                          className='block text-sm text-gray-600 mb-1'
                        >
                          Rental Length
                        </label>
                        <select
                          id='rental-length'
                          value={rentalLength}
                          onChange={(e) => setRentalLength(e.target.value)}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500'
                        >
                          <option value='1 month'>1 month</option>
                          <option value='2 month'>2 month</option>
                          <option value='3 month'>3 month</option>
                          <option value='4 month'>4 month</option>
                          <option value='6 month'>6 month</option>
                          <option value='12 month'>12 month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className='flex space-x-4'>
                <button
                  onClick={handleAddToCart}
                  className='flex-1 bg-primary hover:bg-yellow-600 cursor-pointer text-black font-medium py-3 px-6 rounded-md transition-colors'
                >
                  Add To Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className='flex-1 border border-gray-300 hover:bg-gray-50 cursor-pointer text-black font-medium py-3 px-6 rounded-md transition-colors'
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Product Tabs */}
        <Tabs defaultValue='description' className='w-full'>
          <TabsList className='bg-[#FFFFFF] w-full justify-start border-b rounded-none h-auto pt-10 pb-8 mb-6'>
            <div className='container mx-auto text-center px-4'>
              <TabsTrigger
                value='description'
                className='rounded-none border-b-2 border-transparent data-[state=active]:border-b-yellow-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-2 text-base font-medium'
              >
                DESCRIPTION
              </TabsTrigger>
              <TabsTrigger
                value='additional'
                className='rounded-none border-b-2 border-transparent data-[state=active]:border-b-yellow-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-2 text-base font-medium'
              >
                ADDITIONAL
              </TabsTrigger>
              <TabsTrigger
                value='reviews'
                className='rounded-none border-b-2 border-transparent data-[state=active]:border-b-yellow-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-2 text-base font-medium'
              >
                REVIEWS
              </TabsTrigger>
            </div>
          </TabsList>
          <div className='container mx-auto px-4 py-8'>
            <TabsContent value='description' className='mt-0 bg-[#FFF8ED]'>
              <p className='text-gray-700 leading-relaxed'>
                Upgrade your workspace with this sleek and durable Modern Wooden
                Study Desk. Crafted from high-quality engineered wood, this desk
                is designed to provide maximum comfort and functionality. Its
                spacious surface allows you to organize your essentials, while
                the sturdy legs ensure long-lasting stability.
              </p>
            </TabsContent>

            <TabsContent value='additional' className='mt-0'>
              <div className='space-y-4'>
                <h3 className='font-medium text-lg'>Specifications</h3>
                <ul className='list-disc pl-5 space-y-2 text-gray-700'>
                  <li>Dimensions: 30&quot; H x 32&quot; W x 34&quot; D</li>
                  <li>Weight: 45 lbs</li>
                  <li>Materials: Engineered wood, fabric upholstery</li>
                  <li>Color: Orange/Rust</li>
                  <li>Assembly required: Yes</li>
                  <li>Care instructions: Spot clean only</li>
                </ul>

                <h3 className='font-medium text-lg mt-6'>
                  Shipping Information
                </h3>
                <p className='text-gray-700'>
                  This item ships within 3-5 business days. White glove delivery
                  service available for an additional fee.
                </p>
              </div>
            </TabsContent>

            <TabsContent value='reviews' className='mt-0'>
              <div className='container mx-auto px-4 py-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  {/* Reviews List */}
                  <div className='w-full md:w-1/2'>
                    <h2 className='text-2xl font-medium mb-6'>
                      {reviews.length} Review for living room bundle combo pack
                    </h2>

                    <div className='space-y-6'>
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className='bg-white p-6 rounded-md'
                        >
                          <div className='flex items-start'>
                            <div className='relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0'>
                              <Image
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                                fill
                                className='object-cover'
                              />
                            </div>
                            <div className='flex-1'>
                              <div className='flex justify-between items-center mb-2'>
                                <h3 className='font-medium text-lg'>
                                  {review.name}
                                </h3>
                                <div className='flex items-center'>
                                  <span className='text-yellow-500 mr-1'>
                                    ★
                                  </span>
                                  <span>{review.rating}</span>
                                </div>
                              </div>
                              <p className='text-gray-700 mb-3'>
                                {review.comment}
                              </p>
                              <p className='text-gray-400 text-sm'>
                                {review.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review Form */}
                  <div className='w-full md:w-1/2'>
                    <h2 className='text-2xl font-medium mb-4'>Add a review</h2>
                    <p className='text-gray-600 mb-6'>
                      Your email address will not be published. Required fields
                      are marked
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className='mb-6'>
                        <label className='block text-gray-700 mb-2'>
                          Your rating
                        </label>
                        <div className='flex' onMouseLeave={handleRatingLeave}>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type='button'
                              onClick={() => handleRatingClick(rating)}
                              onMouseEnter={() => handleRatingHover(rating)}
                              className='text-2xl mr-1 focus:outline-none'
                              aria-label={`Rate ${rating} stars`}
                            >
                              {rating <= (hoveredRating || userRating) ? (
                                <span className='text-yellow-500'>★</span>
                              ) : (
                                <span className='text-gray-300'>★</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className='mb-6'>
                        <label
                          htmlFor='review'
                          className='block text-gray-700 mb-2'
                        >
                          Your review
                        </label>
                        <textarea
                          id='review'
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className='w-full h-40 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500'
                          placeholder='Message'
                        ></textarea>
                      </div>

                      {submitSuccess && (
                        <div className='mb-4 p-3 bg-green-100 text-green-700 rounded-md'>
                          Your review has been submitted successfully!
                        </div>
                      )}

                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='bg-yellow-500 hover:bg-yellow-600 text-black font-medium cursor-pointer py-3 px-6 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Related Products */}

      <div className='container mx-auto px-4 pt-8 pb-16'>
        <h2 className='text-2xl md:text-[40px] font-semibold text-[#000000] mb-4'>
          Related Products
        </h2>
        <p className='text-[#545454] text-lg mb-12'>
          Affordable, Stylish, and Ready for You – Choose to Buy or Rent.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {initialProduct.map((product) => (
            <div key={product.id} className='group'>
              <div className='relative h-[332px] bg-[#F5F5F5] flex items-center justify-center rounded-lg overflow-hidden'>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className='absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors'
                  aria-label={
                    favorites.includes(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                {/* <div className='relative h-full w-full'> */}
                <Link
                  href={`/shop/${product.id}`}
                  className='relative h-full w-full'
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className='object-contain'
                  />
                </Link>
                {/* </div> */}
              </div>
              <div className='pt-3'>
                <Link key={product.id} href={`/shop/${product.id}`}>
                  <h3 className='text-xl md:text-[32px] text-[#000000] font-medium mb-1'>
                    {product.name}
                  </h3>

                  <div className='flex justify-between mb-2'>
                    <span className='text-[#000000] text-lg font-medium'>
                      ${product.monthlyPrice}/mo
                    </span>
                    <span className='text-[#333333] text-lg'>
                      ${product.buyPrice} to buy
                    </span>
                  </div>

                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
