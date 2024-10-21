// src/components/Signup.js
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Stack,
  Link,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        username, // Include username in the signup request
        email,
        password,
      });
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <Box
      p={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card
        width="400px"
        bg="gray.800"
        boxShadow="lg"
        borderRadius="md"
        color="white"
      >
        <CardBody>
          <Stack spacing={4}>
            <Heading as="h2" size="lg" textAlign="center" color="teal.400">
              Sign Up
            </Heading>
            <form onSubmit={handleSignup}>
              <FormControl mb={4} isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  bg="gray.700" // Input background color
                  color="white" // Input text color
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="gray.700" // Input background color
                  color="white" // Input text color
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="gray.700" // Input background color
                  color="white" // Input text color
                />
              </FormControl>
              <Button colorScheme="teal" type="submit" w="full">
                Sign Up
              </Button>
            </form>
            {message && (
              <Text color="red.500" textAlign="center">
                {message}
              </Text>
            )}
          </Stack>
        </CardBody>
        <CardFooter>
          <Text textAlign="center">
            Already have an account?{" "}
            <Link color="teal.300" onClick={() => navigate("/login")}>
              Log In
            </Link>
          </Text>
          <Text textAlign="center" mt={2}>
            <Button colorScheme="teal" onClick={() => navigate("/")}>
              Back to Landing Page
            </Button>
          </Text>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default Signup;
