"use client";

import { useState, useEffect } from "react";
import { Minus, Square, X, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Titlebar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const checkMaximized = async () => {
      if (typeof window !== "undefined" && window.electronAPI) {
        const maximized = await window.electronAPI.isMaximized();
        setIsMaximized(maximized);
      }
    };

    checkMaximized();

    // Listen for window state changes
    if (typeof window !== "undefined" && window.electronAPI) {
      const unsubscribe = window.electronAPI.onWindowStateChange(
        (event, data) => {
          setIsMaximized(data.isMaximized);
        }
      );

      return unsubscribe;
    }
  }, []);

  const handleMinimize = () => {
    if (typeof window !== "undefined" && window.electronAPI) {
      window.electronAPI.minimize();
    }
  };

  const handleMaximize = () => {
    if (typeof window !== "undefined" && window.electronAPI) {
      window.electronAPI.toggleMaximize();
    }
  };

  const handleClose = () => {
    if (typeof window !== "undefined" && window.electronAPI) {
      window.electronAPI.close();
    }
  };

  return (
    <div className="flex h-12 items-center justify-between bg-background backdrop-blur supports-[backdrop-filter]:bg-background  drag-region">
      <div className="flex items-center px-4"></div>

      <div className="flex items-center space-x-2 px-4 no-drag">
        <ThemeToggle />
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted"
            onClick={handleMinimize}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted"
            onClick={handleMaximize}
          >
            {isMaximized ? (
              <Copy className="h-3 w-3" />
            ) : (
              <Square className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
