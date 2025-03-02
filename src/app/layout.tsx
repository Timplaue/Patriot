"use client"
import React, { useState } from 'react';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import AuthButtons from "../components/Authbutton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({children, }: Readonly<{ children: React.ReactNode; }>) {
    const [isActive, setIsActive] = useState(false)
    return (
      <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <header className="md:px-[100px] bg-gray-200">
          <div className="container mx-auto flex flex-col lg:flex-row lg:py-0.5">
              <div className="flex justify-between items-center text-[#9D1915] px-4 py-4">
                  <Link href="/">
                      <img src="/logo.svg" style={{width: "200px"}}/>
                  </Link>
                  <div className="block lg:hidden text-black">
                      <button className="focus:outline-none" onClick={() => setIsActive(!isActive)}>
                          <svg className={`${isActive ? "hidden" : "block"} w-7 h-7`} fill="none" stroke="currentColor"
                               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"></path>
                          </svg>
                          <svg className={`${isActive ? "block" : "hidden"} w-7 h-7`} fill="none" stroke="currentColor"
                               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                      </button>
                  </div>
              </div>
              <div
                  className={`${isActive ? "block" : "hidden"} lg:flex flex-col lg:flex-row justify-between lg:items-center w-full text-[#9D1915] px-4 py-5 lg:py-0 lg:border-none border-t-2 border-black`}>
                  <nav>
                      <ul className="flex flex-col lg:flex-row">
                          <li className="hover:text-black"><a href="/VOV"
                                                              className="block lg:px-4 py-5 hover:border-b-2 hover:border-black">История
                              ВОВ</a></li>
                          <li className="hover:text-black"><a href="/SVO"
                                                              className="block lg:px-4 py-5 hover:border-b-2 hover:border-black">СВО-Хроника
                              и подвиги</a></li>
                          <li className="hover:text-black"><a href="/forum"
                                                              className="block lg:px-4 py-5 hover:border-b-2 hover:border-black">Форум</a>
                          </li>
                          <li className="hover:text-black"><a href="/education"
                                                              className="block lg:px-4 py-5 hover:border-b-2 hover:border-black">Образовательный
                              контент</a></li>
                          <li className="hover:text-black"><a href="#"
                                                              className="block lg:px-4 py-5 hover:border-b-2 hover:border-black">Я помогу</a></li>
                      </ul>
                  </nav>
                  <div className="">
                      <ul className="flex lg:flex-row">
                          <AuthButtons/>
                      </ul>
                  </div>
              </div>
          </div>
      </header>

      {children}

      <footer>
          <div className="bg-gray-50 w-full flex flex-col md:flex-row md:justify-between md:px-[100px]">
              <div className="p-5 md:flex md:justify-start">
                  <Link href="/">
                      <img src="/logo.svg" style={{width: "200px"}}/>
                  </Link>
              </div>
              <div className="p-5 md:flex md:justify-end">
                  <div className="flex flex-col md:flex-row md:gap-60">
                      <div className="p-5">
                          <ul>
                              <p className="text-gray-800 font-bold text-2xl pb-4">Быстрые ссылки</p>
                              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[#9D1915] cursor-pointer">
                                  Главная
                              </li>
                              <a href="/forum">
                                  <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[#9D1915] cursor-pointer">
                                      Форум
                                  </li>
                              </a>
                              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[#9D1915] cursor-pointer">
                                  Образовательный контент
                              </li>
                              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[#9D1915] cursor-pointer">
                                  История ВОВ
                              </li>
                              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[#9D1915] cursor-pointer">
                                  СВО-Хроника и подвиги
                              </li>
                              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[#9D1915] cursor-pointer">
                                  О нас
                              </li>
                          </ul>
                      </div>
                      <div className="p-5">
                          <ul>
                              <p className="text-gray-800 font-bold text-2xl pb-4">Контакты</p>
                              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[#9D1915] cursor-pointer">
                                  <a href="mailto:info@123.tu">info@123.tu</a>
                              </li>
                              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[#9D1915] cursor-pointer">
                                  <a href="mailto:info@124.tu">info@123.tu</a>
                              </li>
                          </ul>
                          <ul>
                              <div className="flex gap-6 pb-5">
                                  <FaWhatsapp className="text-2xl cursor-pointer hover:text-green-600"/>
                                  <FaTelegram className="text-2xl cursor-pointer hover:text-blue-600"/>
                              </div>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
          <hr className="mx-[100px]"/>
          <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50">
              <h1 className="text-gray-800 font-semibold">
                  © {new Date().getFullYear()} Все права защищены | Молодежный центр Патриот
              </h1>
          </div>
      </footer>
      </body>
      </html>
    );
}
