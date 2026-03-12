// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
// import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// const Footer = () => {
//     // const [isVisible, setIsVisible] = useState(true);

//     // useEffect(() => {
//     //     setIsVisible(true);
//     // }, []);

//     const footerLinks = {
//         product: [
//             { name: 'Features', href: '#' },
//             { name: 'Pricing', href: '#' },
//             { name: 'Calendar', href: '#' },
//             { name: 'Conferencing', href: '#' }
//         ],
//         company: [
//             { name: 'Contact', href: '#' },
//             { name: 'FAQ', href: '#' },
//             { name: 'Blog', href: '#' },
//             { name: 'Pricing', href: '#' }
//         ],
//         legal: [
//             { name: 'Terms', href: '#' },
//             { name: 'Privacy', href: '#' }
//         ]
//     };

//     return (
//         <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center p-8">
//             {/* Large Background Text */}
//             <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
//                 <h1
//                     className={`text-[20vw] font-bold text-gray-100 select-none transition-all duration-1000`}
//                     style={{ lineHeight: '1' }}
//                 >
//                     Talenex 
//                 </h1>
//             </div>


//             {/* Footer Content */}
//             <footer className="relative z-10 w-full max-w-6xl">
//                 <div
//                     className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 transition-all duration-700 delay-300 `}
//                 >
//                     {/* Logo Column */}
//                     <div className="md:col-span-1">
//                         <div className="flex items-center gap-2 mb-4">

//                             <img src='/logo.png' className='h-11' />
//                         </div>
//                     </div>

//                     {/* Product Column */}
//                     <div className={`transition-all duration-700 delay-400 `}>
//                         <h3 className="font-semibold text-sm mb-4 text-gray-900">Product</h3>
//                         <ul className="space-y-3">
//                             {footerLinks.product.map((link, index) => (
//                                 <li key={index}>
//                                     <a
//                                         href={link.href}
//                                         className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                                     >
//                                         {link.name}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Company Column */}
//                     <div className={`transition-all duration-700 delay-500` }>
//                         <h3 className="font-semibold text-sm mb-4 text-gray-900">Company</h3>
//                         <ul className="space-y-3">
//                             {footerLinks.company.map((link, index) => (
//                                 <li key={index}>
//                                     <a
//                                         href={link.href}
//                                         className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                                     >
//                                         {link.name}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Legal & Social Column */}
//                     <div className={`transition-all duration-700 delay-600 `}>
//                         <h3 className="font-semibold text-sm mb-4 text-gray-900">Legal</h3>
//                         <ul className="space-y-3 mb-6">
//                             {footerLinks.legal.map((link, index) => (
//                                 <li key={index}>
//                                     <a
//                                         href={link.href}
//                                         className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                                     >
//                                         {link.name}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>

//                         <h3 className="font-semibold text-sm mb-4 text-gray-900">Social</h3>
//                         <div className="flex gap-4">
//                             <a
//                                 href="#"
//                                 className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                                 aria-label="Instagram"
//                             >
//                                 <FontAwesomeIcon icon={faInstagram} />
//                             </a>
//                             <a
//                                 href="#"
//                                 className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                                 aria-label="Twitter"
//                             >
//                                 <FontAwesomeIcon icon={faXTwitter} />
//                             </a>
//                             <a
//                                 href="#"
//                                 className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                                 aria-label="LinkedIn"
//                             >
//                                <FontAwesomeIcon icon={faLinkedin} />
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Bar */}
//                 <div
//                     className={`pt-8 border-t border-gray-200 transition-all duration-700 delay-700`}
//                 >
//                     <p className="text-sm text-gray-500 text-center md:text-left">
//                         ©2026 Talenex.All rights reserved.
//                     </p>
//                 </div>
//             </footer>


//         </div>
//     );
// };

// export default Footer;  




import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLinkClick = (e, href, sectionId) => {
        e.preventDefault();

        // If it's a route (starts with /), navigate to it
        if (href && href.startsWith('/') && href !== '/') {
            navigate(href);
            return;
        }

        // If it's a section link (has sectionId)
        if (sectionId) {
            // If we're on the landing page, scroll to section
            if (location.pathname === '/') {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                // If we're on another page, navigate to landing page with hash
                navigate('/', { state: { scrollTo: sectionId } });
            }
        }
    };

    const footerLinks = {
        product: [
            { name: 'Features', href: '#features', sectionId: 'features' },
            { name: 'Pricing', href: '#pricing', sectionId: 'pricing' },
            { name: 'Workflow', href: '#workflow', sectionId: 'workflow' },
            { name: 'Testimonials', href: '#testimonials', sectionId: 'testimonials' }
        ],
        company: [
            { name: 'Contact', href: '/contact' },
            { name: 'FAQ', href: '/faq' },
        ],
        legal: [
            { name: 'Terms & Conditions', href: '/terms' },
            { name: 'Privacy Policy', href: '/privacy' }
        ]
    };

    return (
        <div className="relative bg-transparent mt-[158px] flex flex-col items-center p-8 pb-0 overflow-hidden">

            {/* Footer Content */}
            <footer className="relative z-10 w-full max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 transition-all duration-700 delay-300">

                    {/* Logo Column */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img src='/logo.png' className='h-11' />
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="transition-all duration-700 delay-400">
                        <h3 className="font-semibold text-sm mb-4 text-gray-900">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleLinkClick(e, link.href, link.sectionId)}
                                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="transition-all duration-700 delay-500">
                        <h3 className="font-semibold text-sm mb-4 text-gray-900">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleLinkClick(e, link.href, link.sectionId)}
                                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Social Column */}
                    <div className="transition-all duration-700 delay-600">
                        <h3 className="font-semibold text-sm mb-4 text-gray-900">Legal</h3>
                        <ul className="space-y-3 mb-6">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleLinkClick(e, link.href, link.sectionId)}
                                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-semibold text-sm mb-4 text-gray-900">Social</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/talenexcommunity/"
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a
                                href="https://x.com/Talenex178172"
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                aria-label="Twitter"
                            >
                                <FontAwesomeIcon icon={faXTwitter} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/talenex-community-3244a13aa/"
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 transition-all duration-700 delay-700">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        ©2026 Talenex. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Large Background Text — placed after footer */}
            <div className="relative flex items-center justify-center overflow-hidden pointer-events-none z-0 mt-4">
                <h1
                    className="text-[20vw] font-bold bg-linear-to-b from-gray-400 via-gray-300 via-gray-200 to-gray-100 bg-clip-text text-transparent select-none transition-all duration-1000"
                    style={{ lineHeight: "0.85" }}
                >
                    Talenex
                </h1>
            </div>

        </div>
    );
};

export default Footer;