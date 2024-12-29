"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Dropdown(data) {
  const [selectedItem, setSelectedItem] = React.useState(null)

  const handleCheckedChange = (item) => {
    setSelectedItem(item)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedItem}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{selectedItem}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.items?.map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={selectedItem === item}
            onCheckedChange={() => handleCheckedChange(item)}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
