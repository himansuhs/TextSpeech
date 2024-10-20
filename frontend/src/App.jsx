import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Button,
  Select,
  Textarea,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaStopCircle } from "react-icons/fa";
import LanguagesSelect from "./components/LanguagesSelect";

const App = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSourceText(transcript);
    }
  }, [transcript]);

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://multilingual-text-and-speech-translator.onrender.com/translate-text",
        {
          text: sourceText,
          sourceLang,
          targetLang,
        }
      );
      setTranslatedText(response.data.translatedText);
      showAlert("Translation successful!", "success");
    } catch (error) {
      console.error("Translation error:", error);
      showAlert("Error translating text.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showAlert = (message, status) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); // Alert visible for 3 seconds
  };

  const handleSpeechToText = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
  };

  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLang;
      speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Box p={5} maxW="container.md" mx="auto" bg="#121212">
      <VStack spacing={5} w="100%">
        <Textarea
          placeholder="Enter text to translate"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          size="sm"
          resize="vertical"
          bg="#1E1E1E"
          color="#EAEAEA"
          borderColor="#333333"
        />
        <HStack spacing={5} w="100%" flexWrap="wrap">
          <Select
            placeholder="Select source language"
            onChange={(e) => setSourceLang(e.target.value)}
            value={sourceLang}
            flexBasis={{ base: "100%", md: "48%" }}
            bg="#1E1E1E"
            borderColor="#333333"
            color="#EAEAEA"
            _hover={{ borderColor: "primary.500" }}
            _focus={{ borderColor: "primary.500" }}
            _placeholder={{ color: "#A0AEC0" }}
            size="lg"
            variant="filled"
          >
            <LanguagesSelect />
          </Select>
          <Select
            placeholder="Select target language"
            onChange={(e) => setTargetLang(e.target.value)}
            value={targetLang}
            flexBasis={{ base: "100%", md: "48%" }}
            bg="#1E1E1E"
            borderColor="#333333"
            color="#EAEAEA"
            _hover={{ borderColor: "primary.500" }}
            _focus={{ borderColor: "primary.500" }}
            _placeholder={{ color: "#A0AEC0" }}
            size="lg"
            variant="filled"
          >
            <LanguagesSelect />
          </Select>
        </HStack>

        <Button
          onClick={handleTranslate}
          w={{ base: "100%", md: "48%" }}
          colorScheme="linkedin"
        >
          {isLoading ? (
            <HStack spacing={2}>
              <Spinner size="sm" />
              <span>Translating...</span>
            </HStack>
          ) : (
            "Translate"
          )}
        </Button>
        <Text color="#EAEAEA">Translated Text:</Text>
        <Textarea
          value={translatedText}
          readOnly
          size="sm"
          resize="vertical"
          bg="#1E1E1E"
          color="#EAEAEA"
          borderColor="#333333"
        />
        <Button
          onClick={handleTextToSpeech}
          w={{ base: "100%", md: "48%" }}
          colorScheme="linkedin"
        >
          Play Translated Text
        </Button>
        <Button
          aria-label="Toggle listening"
          onClick={handleSpeechToText}
          rightIcon={listening ? <FaStopCircle /> : <HiSpeakerWave />}
          colorScheme="linkedin"
          w={{ base: "100%", md: "48%" }}
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </Button>
      </VStack>

      {/* Alert Component */}
      {alertVisible && (
        <Alert
          status={alertMessage.includes("Error") ? "error" : "success"}
          variant={alertMessage.includes("Error") ? "error" : "success"} // Use the variant from theme.js
          mt={5}
          position="fixed"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          width="90%"
          borderRadius="8px" // Optional: Use theme styling instead
          padding="12px 20px" // Optional: Use theme styling instead
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)" // Optional: Use theme styling instead
          animation="slide-in 0.5s ease-in-out forwards"
        >
          <AlertIcon />
          {alertMessage}
        </Alert>
      )}
    </Box>
  );
};

export default App;
