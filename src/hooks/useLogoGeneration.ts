import { useState, useEffect } from "react";
import {
  createLogoRequest,
  updateLogoRequestStatus,
  createLogoResult,
  getLogoResultByRequestId,
} from "../services/logoService";
import { LogoStyle, ProcessingStatus } from "../types";

interface UseLogoGenerationProps {
  initialPrompt?: string;
  initialStyle?: LogoStyle;
}

interface UseLogoGenerationResult {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedStyle: LogoStyle;
  setSelectedStyle: (style: LogoStyle) => void;
  status: ProcessingStatus;
  timeRemaining: number;
  logoId: string | null;
  logoUrl: string | null;
  generateLogo: () => Promise<void>;
  isGenerating: boolean;
  error: Error | null;
}

export const useLogoGeneration = ({
  initialPrompt = "",
  initialStyle = "NoStyle",
}: UseLogoGenerationProps = {}): UseLogoGenerationResult => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>(initialStyle);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [logoId, setLogoId] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "processing" && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status, timeRemaining]);

  useEffect(() => {
    const completeGeneration = async () => {
      if (status === "processing" && timeRemaining === 0 && logoId) {
        try {
          await updateLogoRequestStatus(logoId, "done");
          await createLogoResult(logoId, selectedStyle);

          setStatus("done");
          setIsGenerating(false);

          const result = await getLogoResultByRequestId(logoId);
          if (result && result.imageUrl) {
            setLogoUrl(result.imageUrl);
          } else {
            console.warn("No imageUrl found in result");
          }
        } catch (err) {
          console.error("Error completing logo generation:", err);
          setStatus("error");
          setIsGenerating(false);
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      }
    };
    completeGeneration();
  }, [status, timeRemaining, logoId, selectedStyle]);

  const generateLogo = async () => {
    if (isGenerating) return;
    try {
      setIsGenerating(true);
      setStatus("processing");
      setError(null);
      setLogoUrl(null);

      const processingTime = Math.floor(Math.random() * 31) + 30;
      setTimeRemaining(processingTime);

      const id = await createLogoRequest(prompt, selectedStyle);
      setLogoId(id);
    } catch (err) {
      console.error("Error starting logo generation:", err);
      setStatus("error");
      setIsGenerating(false);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  return {
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    status,
    timeRemaining,
    logoId,
    logoUrl,
    generateLogo,
    isGenerating,
    error,
  };
};
