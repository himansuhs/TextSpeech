import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#121212", // Dark background
        color: "#EAEAEA", // Light text
        fontFamily: "Arial, sans-serif",
      },
    },
  },
  colors: {
    primary: {
      500: "#1DB954", // Green for primary actions
    },
    secondary: {
      500: "#F36F6F", // Coral for secondary actions
    },
    success: {
      500: "#052105", // Dark green for success alerts
    },
    error: {
      500: "#f74c4c", // Bright red for error alerts
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "12px", // Rounded corners
      },
      variants: {
        solid: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "secondary.500", // Change color on hover
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        bg: "#1E1E1E", // Dark background for textareas
        borderColor: "#333333",
        color: "#EAEAEA",
        _hover: {
          borderColor: "primary.500",
        },
      },
    },
    Alert: {
      baseStyle: {
        borderRadius: "8px", // Rounded corners for alerts
        padding: "12px 20px", // Padding for alerts
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow for alerts
        fontWeight: "bold", // Bold text for alerts
      },
      variants: {
        success: {
          bg: "success.500", // Background color for success alerts
          color: "white", // Text color for success alerts
          _hover: {
            bg: "#0a2d00", // Darker green on hover for success
          },
        },
        error: {
          bg: "error.500", // Background color for error alerts
          color: "white", // Text color for error alerts
          _hover: {
            bg: "#b03030", // Darker red on hover for error
          },
        },
      },
    },
  },
});

export default theme;
