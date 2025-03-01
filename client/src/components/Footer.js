import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
        <div className="w-full shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Developed and Hosted by */}
                <div className="text-center text-gray-600 text-sm mb-4">
                    Developed and Hosted by <span className="font-semibold">Rakini SoftTech Private Limited</span>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center items-center gap-5">
                {/* GitHub */}
            <Link
                to="https://github.com/Prash9370/CAP-Backend.git"
                className="w-14 h-14 rounded-full bg-gray-800 flex justify-center items-center overflow-hidden 
                transition duration-300 shadow-md hover:bg-gray-600 active:scale-90"
            >
                <svg className="w-6 h-6" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.86 2.33.66.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
            </Link>

                    {/* Twitter */}
                    <Link
                        to="#"
                        className="w-14 h-14 rounded-full bg-gray-800 flex justify-center items-center overflow-hidden transition duration-300 hover:bg-[#00acee] active:scale-90"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 16 16">
                            <path
                                className="fill-white transition duration-300"
                                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                            ></path>
                        </svg>
                    </Link>

                    {/* LinkedIn */}
                    <Link
                        to="https://www.linkedin.com/company/rakini-softech/"
                        className="w-14 h-14 rounded-full bg-gray-800 flex justify-center items-center overflow-hidden transition duration-300 hover:bg-[#0072b1] active:scale-90"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 448 512">
                            <path
                                className="fill-white transition duration-300"
                                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                            ></path>
                        </svg>
                    </Link>

                    {/* WhatsApp */}
                    <Link
                        to="9370286362"
                        className="w-14 h-14 rounded-full bg-gray-800 flex justify-center items-center overflow-hidden transition duration-300 hover:bg-[#128C7E] active:scale-90"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 16 16">
                            <path
                                className="fill-white transition duration-300"
                                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                            ></path>
                        </svg>
                    </Link>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-600 text-sm mt-4">
                    © {new Date().getFullYear()} Rakini SoftTech Private Limited. All rights reserved.
                </div>
            </div>
        </div></>
    );
}

export default Footer;