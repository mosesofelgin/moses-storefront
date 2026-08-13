import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DownloadButtonProps {
  endpoint?: string;
  href?: string;
  filename: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  iconOnly?: boolean;
}

export default function DownloadButton({
  endpoint,
  href,
  filename,
  label = "Download",
  variant = "primary",
  size = "md",
  className = "",
  iconOnly = false,
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

      const downloadUrl = href || endpoint;
      if (!downloadUrl) {
        throw new Error("No download URL provided");
      }

      const response = await fetch(downloadUrl);

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
      setTimeout(() => URL.revokeObjectURL(url), 100);

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
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded transition-all
        active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={iconOnly ? `Download ${filename}` : undefined}
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download size={iconOnly ? 16 : 20} />
          {!iconOnly && label}
        </>
      )}
    </button>
  );
}
