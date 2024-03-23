import {
  motion,
  AnimatePresence,
  LazyMotion,
  domAnimation,
} from "framer-motion";

export const Presence = ({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: React.ReactNode;
}) => (
  <AnimatePresence initial={false}>
    <LazyMotion features={domAnimation}>
      {isVisible ? (
        <motion.div
          className="bg-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          translate="yes"
          transition={{ delay: 1, bounce: "yes" }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          className="bg-blue-400 w-[200px] h-[200px]"
          translate="yes"
          transition={{ delay: 1, bounce: "yes" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Hello From Second
        </motion.div>
      )}
    </LazyMotion>
  </AnimatePresence>
);
