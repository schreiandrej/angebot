import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AccordionItem = ({ i, expanded, setExpanded }) => {
  const isOpen = i === expanded

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
        initial={false}
        // animate={{ backgroundColor: isOpen ? '#FF0088' : '#0055FF' }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className='bg-accent text-base cursor-pointer h-10 w-1/2 mb-2'
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='w-1/2 overflow-hidden'
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.8 }}
              className='border border-base p-4 origin-top'
            >
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

const accordionIds = [0, 1, 2, 3]

export const Accordion = () => {
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const [expanded, setExpanded] = useState(false)

  return accordionIds.map((i) => (
    <AccordionItem
      key={i}
      i={i}
      expanded={expanded}
      setExpanded={setExpanded}
    />
  ))
}
