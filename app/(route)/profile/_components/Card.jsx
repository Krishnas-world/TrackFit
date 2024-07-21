import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ imageSrc, discountText, title, description, buttonText, buttonLink }) => {
  return (
    <Link href={buttonLink} className="relative block rounded-tr-3xl border border-gray-100">
      <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
        {discountText}
      </span>

      <Image
        src={imageSrc}
        alt={title}
        height={40}
        width={50}
        className="h-80 w-full rounded-tr-3xl object-cover"
      />

      <div className="p-4 text-center">
        <strong className="text-xl font-medium text-gray-900">{title}</strong>

        <p className="mt-2 text-pretty text-gray-700">
          {description}
        </p>

        <span
          className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
        >
          {buttonText}
        </span>
      </div>
    </Link>
  );
};

export default Card;
