import { AnimatePresence, motion } from "framer-motion";
import React from 'react';
import Image from 'next/image';
import Header from '../components/Header';

import DefaultHeadshot from '../../public/headshots/harish_headshot.png'
import GavinHeadshot from '../../public/headshots/gavin_headshot.png'
import AnmolHeadshot from '../../public/headshots/anmol_headshot.jpg'
import TamanHeadshot from '../../public/headshots/taman_headshot.png'
import ChaitHeadshot from '../../public/headshots/chait_headshot.png'

export default function About() {

    const teamMembers = [
        {
            name: 'Chaitanya Chaurasia',
            school: 'Arizona State University',
            major: 'CS',
            graduationDate: 'May 2025',
            image: ChaitHeadshot,
            website: 'https://www.linkedin.com/in/chai-t/'
        },
        {
            name: 'Gavin Holtzapple',
            school: 'Arizona State University',
            major: 'CS',
            graduationDate: 'May 2025',
            image: GavinHeadshot,
            website: 'https://gholtzap.github.io/'
        },
        {
            name: 'Anmol Rao',
            school: 'Arizona State University',
            major: 'CS, Math (Double major)',
            graduationDate: 'May 2025',
            image: AnmolHeadshot,
            website: 'https://www.linkedin.com/in/anmol-rao/'

        },
        {
            name: 'Taman Truong',
            school: 'Arizona State University',
            major: 'CS, Math, EE (Triple Major)',
            graduationDate: 'May 2024',
            image: TamanHeadshot,
            website: 'https://www.linkedin.com/in/taman-truong/'

        },
        {
            name: 'Harish Chaurasia',
            school: 'Arizona State University',
            major: 'CS',
            graduationDate: 'May 2025',
            image: DefaultHeadshot,
            website: 'https://www.linkedin.com/in/harishchaurasia/'
        }
    ];

    return (
        <AnimatePresence>
            <Header />
            <div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col relative bg-[#2C2C2C] font-inter overflow-hidden">
                <svg className="fixed z-[1] w-full h-full opacity-[35%]">
                    <rect width="100%" height="100%" filter="url(#noise)"></rect>
                </svg>

                <main className="flex flex-col justify-center h-[90%] static md:fixed w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] z-[100] pt-[30px] pb-[320px] px-4 md:px-20 md:py-0">

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="relative md:ml-[-10px] md:mb-[37px] leading-snug font-extrabold text-[4vw] md:text-[50px] font-inter text-[#a98efe] leading-[0.9] tracking-[-2px] z-[100]"
                    >
                        About Us
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.25,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="text-[18px] leading-[26px] text-[#8d64e4] mb-8"
                    >
                        Our team is dedicated to empowering individuals by demystifying the complexities of legal agreements. We channeled our passion 
                        into the SunHacks hackathon, focusing on developing The Susinator, a tool designed to bring clarity 
                        and understanding to the often opaque world of contracts. We strive to simplify the intricacies
                         of contracts, making it easier for everyone to recognize their rights and responsibilities without getting lost in the fine print.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.35,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        {teamMembers.map(member => (
                            <div key={member.name} className="flex flex-col items-center space-y-4">
                                <div className="w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={member.image} alt={member.name} width={128} height={128} className="w-full h-full object-cover" />

                                </div>
                                <h2 className="text-[#a98efe] text-3xl">
                                    {member.website ? (
                                        <a
                                            href={member.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-[#a98efe] transition duration-200"
                                        >
                                            {member.name}
                                        </a>
                                    ) : (
                                        member.name
                                    )}
                                </h2>
                                <p className="text-[#8d64e4] text-2xl">{member.school}</p>
                                <p className="text-[#8d64e4]">Studying {member.major}</p>
                                <p className="text-[#8d64e4]">Graduating {member.graduationDate}</p>
                            </div>
                        ))}
                    </motion.div>
                </main>

                <div className="fixed top-0 right-0 w-[80%] md:w-1/2 h-screen bg-[#8d64e4]/20" style={{
                    clipPath: "polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
                }}>
                </div>
            </div>
        </AnimatePresence>
    )
}
