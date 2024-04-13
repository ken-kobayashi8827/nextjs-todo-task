import Header from '@/app/components/todo/Header';
import { Container } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Container maxW='1000px'>{children}</Container>
    </>
  );
};

export default Layout;
