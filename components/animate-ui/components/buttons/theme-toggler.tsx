'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';

import {
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
  type ThemeSelection,
  type Resolved,
} from '@/components/animate-ui/primitives/effects/theme-toggler';
import { Button } from '@/components/ui/button';

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const getIcon = (
  effective: ThemeSelection,
  resolved: Resolved,
  modes: ThemeSelection[],
) => {
  const theme = modes.includes('system') ? effective : resolved;
  return theme === 'system' ? (
    <Monitor />
  ) : theme === 'dark' ? (
    <Moon />
  ) : (
    <Sun />
  );
};

const getNextTheme = (
  effective: ThemeSelection,
  modes: ThemeSelection[],
): ThemeSelection => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

type ThemeTogglerButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'children'
> & {
    modes?: ThemeSelection[];
    onImmediateChange?: ThemeTogglerPrimitiveProps['onImmediateChange'];
    direction?: ThemeTogglerPrimitiveProps['direction'];
};

function ThemeTogglerButton({
  variant = 'ghost',
  size = 'icon-sm',
  modes = ['light', 'dark', 'system'],
  direction = 'ltr',
  onImmediateChange,
  onClick,
  className,
  ...props
}: ThemeTogglerButtonProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isHydrated = React.useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );

  return (
    <ThemeTogglerPrimitive
      theme={theme as ThemeSelection}
      resolvedTheme={resolvedTheme as Resolved}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ effective, resolved, toggleTheme }) => (
        <Button
          {...props}
          data-slot="theme-toggler-button"
          variant={variant}
          size={size}
          className={className}
          onClick={(e) => {
            onClick?.(e);
            toggleTheme(getNextTheme(effective, modes));
          }}
        >
          {isHydrated ? getIcon(effective, resolved, modes) : <Sun />}
        </Button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };
