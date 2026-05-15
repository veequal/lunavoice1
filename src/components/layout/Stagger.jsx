import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function StaggerChildren({ children, className = '' }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ index = 0, children, className = '' }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div custom={index} variants={childVariants} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  )
}
