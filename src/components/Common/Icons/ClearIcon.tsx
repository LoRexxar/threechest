﻿import type { SVGProps } from 'react';
import { forwardRef } from 'react'
import type { IconComponent } from '../../../util/types.ts'

export const ClearIcon: IconComponent = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="m15.87 2.669 4.968 4.968a2.25 2.25 0 0 1 0 3.182l-8.681 8.68 6.097.001a.75.75 0 0 1 .744.648l.006.102a.75.75 0 0 1-.648.743l-.102.007-8.41.001a2.244 2.244 0 0 1-1.714-.655l-4.968-4.969a2.25 2.25 0 0 1 0-3.182l9.526-9.526a2.25 2.25 0 0 1 3.182 0ZM5.709 11.768l-1.487 1.488a.75.75 0 0 0 0 1.06l4.969 4.969c.146.146.338.22.53.22l.029-.005.038.002a.747.747 0 0 0 .463-.217l1.487-1.487-6.03-6.03Zm8.04-8.039-6.98 6.978 6.03 6.03 6.979-6.978a.75.75 0 0 0 0-1.061l-4.969-4.969a.75.75 0 0 0-1.06 0Z" />
      </svg>
    )
  },
)

ClearIcon.displayName = 'ClearIcon'
