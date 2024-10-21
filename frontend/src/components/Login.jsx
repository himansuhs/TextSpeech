// src/components/Login.js
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
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      // Check response structure for successful login
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token if applicable
        navigate("/app"); // Navigate to App component
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("Invalid credentials. Please try again.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
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
              Log In
            </Heading>
            <form onSubmit={handleLogin}>
              <FormControl mb={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  required
                  bg="gray.700" // Input background color
                  color="white" // Input text color
                />
              </FormControl>
              <Button colorScheme="teal" type="submit" w="full">
                Log In
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
            Don't have an account?{" "}
            <Link color="teal.300" onClick={() => navigate("/signup")}>
              Sign Up
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default Login;
