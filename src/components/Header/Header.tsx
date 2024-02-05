import { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './Header.scss';

interface HeaderProps {
  children: ReactNode;
  hidden: boolean;
}

const Header = ({ children, hidden = false }: HeaderProps) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: hidden ? -100 : 0,
    });
  }, [hidden, controls]);

  return (
    <motion.header
      className="header"
      id="header"
      animate={controls}
      transition={{ duration: 0.2 }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.header>
  );
};

export default Header;
