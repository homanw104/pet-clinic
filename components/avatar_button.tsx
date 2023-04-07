import Image, { StaticImageData } from "next/image";
import { Button, ButtonProps, Stack, Typography, useTheme } from "@mui/material";

interface AvatarButtonProps extends ButtonProps {
  src: StaticImageData;
  alt: string;    // Image description
  name: string;   // Button name in English
}

export default function AvatarButton({ children, src, alt, name, ...props }: AvatarButtonProps) {
  const theme = useTheme();

  return (
    <Button {...props} sx={{
      backgroundColor: theme.palette.surface[3],
      color: theme.palette.surface.onMain,
      overflow: "hidden",
      padding: 0,
    }}>
      <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" width="100%">
        <Image src={src} alt={alt} width={96} height={96} />
        <Stack direction="column" spacing={0.5} alignItems="stretch" justifyContent="center" width="124px">
          <Typography variant="h5" align="left" noWrap={true} lineHeight={1}>
            {children}
          </Typography>
          <Typography variant="h6" align="left" noWrap={true} lineHeight={1} style={{
            textTransform: "none", fontVariant: "small-caps"
          }}>
            {name}
          </Typography>
        </Stack>
      </Stack>
    </Button>
  )
};
