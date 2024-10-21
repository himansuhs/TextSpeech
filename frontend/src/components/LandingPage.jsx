// src/components/LandingPage.js
import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bgg.png"; // Background image

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      backgroundColor="gray.900"
      color="white"
    >
      <Flex
        flexGrow={1}
        justifyContent="space-between"
        alignItems="center"
        p={10}
        flexDirection={{ base: "column", md: "row" }}
        position="relative"
      >
        {/* Left Side: Text and Buttons */}
        <Flex
          flex="1"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={5}
          position="relative"
          zIndex="2"
          maxW={{ base: "100%", md: "500px" }} // Responsive width
        >
          <VStack spacing={4}>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }}>
              Transform Your Voice
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} maxW="400px">
              Experience seamless text-to-speech and speech-to-text capabilities
              in multiple languages. Whether you're learning a new language or
              need to communicate efficiently, we've got you covered!
            </Text>
            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent="center"
              width="100%"
              mt={5}
            >
              <Button
                onClick={() => navigate("/login")}
                colorScheme="teal"
                size="lg"
                borderRadius="md"
                mr={{ md: 3 }}
                width={{ base: "100%", md: "auto" }} // Responsive width
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                colorScheme="teal"
                size="lg"
                borderRadius="md"
                width={{ base: "100%", md: "auto" }} // Responsive width
              >
                Signup
              </Button>
            </Flex>
          </VStack>
        </Flex>

        {/* Right Side: Image */}
        <Flex
          flex="1"
          justifyContent="center"
          alignItems="center"
          height="400px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="xl"
          position="relative"
          zIndex="1"
        >
          <Image
            src={bg} // Replace with your image URL
            alt="Text to Speech Illustration"
            borderRadius="lg"
            boxSize="100%"
            objectFit="cover"
            opacity="0.8"
          />
        </Flex>
      </Flex>

      {/* Call-to-Action Section */}
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={10}
        backgroundColor="gray.800"
        borderRadius="lg"
        boxShadow="lg"
        mt={5}
      >
        <Heading as="h3" size="lg" mb={4}>
          Discover the Features
        </Heading>
        <Text textAlign="center" mb={4}>
          Our app provides intuitive tools for translating text and speech
          across multiple languages, making communication effortless.
        </Text>
        <Button
          onClick={() => navigate("/login")} // Add a route for features if needed
          colorScheme="teal"
          size="lg"
        >
          Explore Features
        </Button>
      </Flex>
      <Spacer />
    </Box>
  );
};

export default LandingPage;
