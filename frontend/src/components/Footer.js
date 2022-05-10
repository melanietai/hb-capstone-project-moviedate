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
        px="6"
        py="4"
        backgroundColor="#16123F"
        w="100%"
        justify="space-between"
        color="#FAFAFA"
      >
        <Flex>
          <Image h="14px" src={GitHub} mt={0.5}/>
          <Text ml={2} fontSize="12px">github.com/melanietai</Text>
          <Spacer />
          <Text fontSize="12px">Made at Hackbright, June 2022</Text>
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