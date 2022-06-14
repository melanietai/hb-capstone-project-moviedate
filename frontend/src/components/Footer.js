import { Link } from 'react-router-dom';
import { 
  Flex,
  Image,
  Spacer,
  Text,
  Box
} from "@chakra-ui/react";
import GitHub from '../GitHub.png';
import LinkedIn from '../LinkedIn.png';
import TMDB from '../TMDB.svg';


const Footer = () => {

  return(
    <>
     <Box as="footer" 
        px="4"
        py="2"
        backgroundColor="#16123F"
        w="100%"
        h="50px"
        justify="space-between"
        color="#FAFAFA"
        position="fixed"
        bottom="0"
      >
        <Flex>
          <Image h="14px" src={GitHub} mt={0.5}/>
          <Text ml={2} fontSize="12px">github.com/melanietai</Text>
          <Spacer />
          <Text fontSize="12px">Developed solely by Melanie Tai. Made at Hackbright, May 2022</Text>
        </Flex>
        <Flex>
          <Image h="12px" src={LinkedIn} mt={1}/>
          <Text ml={2} fontSize="12px">linkedin.com/in/melanie-tai/</Text>
          <Spacer />
          <Text fontSize="12px">This product uses the TMDB API but is not endorsed or certified by TMDB.</Text>
          <Image h="12px" ml={1} mt={1} src={TMDB}/>
        </Flex>
      </Box>
    </>
   
  );
};


export default Footer;