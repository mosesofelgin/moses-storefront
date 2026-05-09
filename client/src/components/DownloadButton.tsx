import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DownloadButtonProps {
  endpoint: string;
  filename: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function DownloadButton({
  endpoint,
  filename,
  label = "Download",
  variant = "primary",
  size = "md",
  className = "",
}: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const variantClasses = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-zinc-700 hover:bg-zinc-600 text-white",
    outline: "border border-zinc-600 hover:border-zinc-500 text-zinc-100",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      toast.loading("Preparing download...");

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Create object URL and trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up the object URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      toast.dismiss();
      toast.success(`${filename} downloaded successfully!`);
    } catch (error) {
      console.error("Download error:", error);
      toast.dismiss();
      toast.error(
        error instanceof Error
          ? error.message
          : "Download failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`
        inline-flex items-center gap-2 font-medium rounded transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={label}
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download size={20} />
          {label}
        </>
      )}
    </button>
  );
}
