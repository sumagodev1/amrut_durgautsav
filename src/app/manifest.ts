import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "दुर्गोत्सव २०२५ | अमृत महाराष्ट्र",
    short_name: "दुर्गोत्सव २०२५",
    description:
      "शिवछत्रपतींच्या पराक्रमाचे साक्षीदार राहिलेल्या आपल्या १२ गडदुर्गांना UNESCO कडून वैश्विक ख्यातीच्या वास्तू म्हणून मान्यता मिळाली. दुर्गोत्सव २०२५ मध्ये सहभागी व्हा!",
    start_url: "/mr",
    display: "standalone",
    background_color: "#0d0b09",
    theme_color: "#0d0b09",
    lang: "mr-IN",
    icons: [
      {
        src: "/media/durgotsav-logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
