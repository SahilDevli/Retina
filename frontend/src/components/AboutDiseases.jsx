import React from 'react'
import '../styles/AboutDiseases.css'
import { motion } from 'framer-motion'
// import { Link } from "react-router-dom";

const diseases = [
    {
        name: 'Diabetic Retinopathy',
        desc: 'A diabetes complication that affects eyes due to damage to the blood vessels of the retina.',
        link: 'https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/diabetic-retinopathy'
    },
    {
        name: 'Glaucoma',
        desc: 'Increased intraocular pressure damages the optic nerve, gradually affecting peripheral vision.',
        link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5310929/'
    },
    {
        name: 'Age-related Macular Degeneration (AMD)',
        desc: 'Affects central vision leading to difficulty reading and recognizing faces.',
        link: 'https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/age-related-macular-degeneration'
    }
]

export default function AboutDiseases(){
    return (
        <section className="about-section">
            <div className="container">
                <motion.h2 
                    className="about-title" 
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6 }}
                >
                    About Major Eye Diseases
                </motion.h2>

                <div className="disease-grid">

                    {diseases.map((d, i)=> (
                        <motion.div 
                            key={i} 
                            className="disease-card" 
                            whileHover={{ y: -8 }}
                        >
                            <div className="disease-icon">{i+1}</div>
                            <h3 className="disease-name">{d.name}</h3>
                            <p className="disease-desc">{d.desc}</p>

                            <a href={d.link} target="_blank" rel="noopener noreferrer" className="disease-link">
                                learn more ↗
                            </a>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}
