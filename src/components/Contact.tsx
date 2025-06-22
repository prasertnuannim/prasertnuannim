"use client";

import { motion } from "framer-motion";
import { SiLine } from "react-icons/si";

export default function Contact() {
  return (
    <div className="min-h-screen py-16 bg-gray-300">
      <div className="mx-auto px-1 text-center">
        <h2 className="text-3xl font-bold text-while ">Contact</h2>

        <motion.p
          className="text-xl text-blue-800 py-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="mailto:nuannimprasert@gmail.com"
            className="text-blue-600-400 hover:underline mt-2 inline-block"
          >
            nuannimprasert@gmail.com
          </a>
        </motion.p>

        <motion.a
          href="https://line.me/R/ti/p/~s_er_t"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SiLine className="text-xl" />
          ส่งข้อความทาง LINE
        </motion.a>
      </div>
    </div>
  );
}
