'use client';

import * as React from 'react';
import {useTheme} from 'next-themes';
import {Monitor, Moon, Sun} from 'lucide-react';

import {
  type Resolved,
  type ThemeSelection,
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
} from '@/components/animate-ui/primitives/effects/theme-toggler';
import {Button} from '@/components/ui/button';
import {playSound} from '@/lib/sound-engine';
import {switchOffSound} from '@/lib/switch-off';
import {switchOnSound} from '@/lib/switch-on';

const subscribeToHydration = () => () => {
};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const getIcon = (
  effective: ThemeSelection,
  resolved: Resolved,
  modes: ThemeSelection[],
) => {
  const theme = modes.includes('system') ? effective : resolved;
  return theme === 'system' ? (
    <Monitor/>
  ) : theme === 'dark' ? (
    <Moon/>
  ) : (
    <Sun/>
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

const getResolvedTheme = (theme: ThemeSelection): Resolved => {
  if (theme !== 'system') return theme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const playThemeSound = (theme: ThemeSelection) => {
  const sound =
    getResolvedTheme(theme) === 'dark' ? switchOnSound : switchOffSound;

  void playSound(sound.dataUri).catch(() => {
    // Audio can be unavailable or disabled without blocking the theme change.
  });
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
                              modes = ['light', 'dark'],
                              direction = 'ltr',
                              onImmediateChange,
                              onClick,
                              className,
                              ...props
                            }: ThemeTogglerButtonProps) {
  const {theme, resolvedTheme, setTheme} = useTheme();
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
      {({effective, resolved, toggleTheme}) => (
        <Button
          {...props}
          data-slot="theme-toggler-button"
          variant={variant}
          size={size}
          className={className}
          onClick={(e) => {
            onClick?.(e);
            const nextTheme = getNextTheme(effective, modes);

            playThemeSound(nextTheme);
            toggleTheme(nextTheme);
          }}
        >
          {isHydrated ? getIcon(effective, resolved, modes) : <Sun/>}
        </Button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export {ThemeTogglerButton, type ThemeTogglerButtonProps};
