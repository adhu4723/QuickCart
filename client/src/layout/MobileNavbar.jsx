import React, { useState } from 'react';
import {
  Home,
  Menu,
  Heart,
  User,
  ShoppingBag,
} from 'lucide-react';

const navItems = [
  { label: 'HOME', icon: Home },
  { label: 'COLLECTION', icon: Menu },
  { label: 'WISHLIST', icon: Heart },
  { label: 'ACCOUNT', icon: User },
  { label: 'CART', icon: ShoppingBag, badge: 2 },
];

export default function MobileNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white   shadow-lg flex justify-around py-4 md:hidden z-40">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative flex flex-col items-center text-xs cursor-pointer ${
              isActive ? 'text-[#0371a8] ' : 'text-black'
            }`}
          >
            <Icon  className={`w-6 h-6 ${isActive ? 'stroke-2 fill' : 'stroke-[1.5]'}`} />
            {item.badge && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {item.badge}
              </span>
            )}
            <span className="mt-1 text-[11px]">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
