"use client";

import type React from "react";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export default function MyAccountPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingShippingAddress, setIsEditingShippingAddress] =
    useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [address, setAddress] = useState<Address>({
    name: "Johan Smaith",
    street: "1388 Market st, suite 400",
    city: "san fransisco",
    state: "CA",
    zip: "526",
  });

  const [shippingAddress, setShippingAddress] = useState<Address>({
    name: "Johan Smaith",
    street: "1388 Market st, suite 400",
    city: "san fransisco",
    state: "CA",
    zip: "526",
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingAddressChange = (field: keyof Address, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const formatAddress = (address: Address) => {
    return `${address.street} ${address.city}, ${address.state} ${address.zip}`;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className='bg-[#FFFFFF]'>
      <div className='container mx-auto'>
        {/* <h1 clssName='text-3xl font-medium text-center mb-8'>My Account</h1> */}

        <div className='flex flex-col md:flex-row gap-8'>
          {/* Main Content */}
          <div className='w-full md:w-3/4'>
            <h2 className='text-2xl font-medium mb-6'>Account Details</h2>

            {/* Profile Info */}
            <div className='flex items-center gap-4 mb-8'>
              <div className='relative'>
                <div className='w-20 h-20 rounded-full overflow-hidden bg-gray-200'>
                  <Image
                    src={profileImage || "/clients/user.png"}
                    alt='Profile'
                    width={80}
                    height={80}
                    className='object-cover'
                  />
                </div>
                <button
                  className='absolute bottom-0 right-0 bg-blue-500 text-white cursor-pointer rounded-full p-1'
                  aria-label='Edit profile picture'
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Pencil size={16} />
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept='image/*'
                    className='hidden'
                  />
                </button>
              </div>
              <div>
                <h3 className='text-xl font-medium'>Johan Smaith</h3>
                <p className='text-gray-600'>info123@gmail.com</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className='mb-8'>
              <h3 className='text-lg font-medium mb-2'>Phone Number</h3>
              <div className='relative'>
                <input
                  type='tel'
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder='Phone number'
                  className='w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-gray-400'
                />
              </div>
            </div>

            {/* Address */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              {/* Billing Address */}
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-lg font-medium'>Address</h3>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className='text-blue-500 rounded-full p-1 cursor-pointer'
                    aria-label='Edit address'
                  >
                    <Pencil size={20} />
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className='space-y-3'>
                    <input
                      type='text'
                      value={address.name}
                      onChange={(e) =>
                        handleAddressChange("name", e.target.value)
                      }
                      className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                      placeholder='Full name'
                    />
                    <input
                      type='text'
                      value={address.street}
                      onChange={(e) =>
                        handleAddressChange("street", e.target.value)
                      }
                      className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                      placeholder='Street address'
                    />
                    <div className='grid grid-cols-3 gap-2'>
                      <input
                        type='text'
                        value={address.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='City'
                      />
                      <input
                        type='text'
                        value={address.state}
                        onChange={(e) =>
                          handleAddressChange("state", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='State'
                      />
                      <input
                        type='text'
                        value={address.zip}
                        onChange={(e) =>
                          handleAddressChange("zip", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='ZIP'
                      />
                    </div>
                    <div className='flex justify-end'>
                      <button
                        onClick={() => setIsEditingAddress(false)}
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className='text-gray-800'>{address.name}</p>
                    <p className='text-gray-800'>{formatAddress(address)}</p>
                  </div>
                )}
              </div>

              {/* Shipping Address */}
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-lg font-medium'>Shipping Address</h3>
                  <button
                    onClick={() =>
                      setIsEditingShippingAddress(!isEditingShippingAddress)
                    }
                    className='text-blue-500 rounded-full p-1 cursor-pointer'
                    aria-label='Edit shipping address'
                  >
                    <Pencil size={20} />
                  </button>
                </div>

                {isEditingShippingAddress ? (
                  <div className='space-y-3'>
                    <input
                      type='text'
                      value={shippingAddress.name}
                      onChange={(e) =>
                        handleShippingAddressChange("name", e.target.value)
                      }
                      className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                      placeholder='Full name'
                    />
                    <input
                      type='text'
                      value={shippingAddress.street}
                      onChange={(e) =>
                        handleShippingAddressChange("street", e.target.value)
                      }
                      className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                      placeholder='Street address'
                    />
                    <div className='grid grid-cols-3 gap-2'>
                      <input
                        type='text'
                        value={shippingAddress.city}
                        onChange={(e) =>
                          handleShippingAddressChange("city", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='City'
                      />
                      <input
                        type='text'
                        value={shippingAddress.state}
                        onChange={(e) =>
                          handleShippingAddressChange("state", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='State'
                      />
                      <input
                        type='text'
                        value={shippingAddress.zip}
                        onChange={(e) =>
                          handleShippingAddressChange("zip", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='ZIP'
                      />
                    </div>
                    <div className='flex justify-end'>
                      <button
                        onClick={() => setIsEditingShippingAddress(false)}
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className='text-gray-800'>{shippingAddress.name}</p>
                    <p className='text-gray-800'>
                      {formatAddress(shippingAddress)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
