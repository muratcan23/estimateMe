import { Box } from "@chakra-ui/react";

const BackgroundImg = () => {
  const imageUrl =
    "https://previews.123rf.com/images/willypd/willypd1407/willypd140700010/29951168-illustration-of-chalkboard-with-math-formula.jpg"; // Replace this with the actual path to your image

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex="-1"
      backgroundImage={`url(${imageUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      filter="brightness(0.33) blur(4px) "
    />
  );
};
export default BackgroundImg;
