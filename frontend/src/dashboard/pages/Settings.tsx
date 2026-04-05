import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun} from "lucide-react";
import { useTheme } from "../hooks/useTheme";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md z-9999 fixed">

        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-primary" />
            ) : (
              <Sun className="h-5 w-5 text-primary" />
            )}

            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">
                Toggle application theme
              </p>
            </div>
          </div>

          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
