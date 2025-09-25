import {
  TrendUp01,
  Users01,
  SearchLg,
  Mail01,
  InfoCircle,
  Briefcase01,
  File01,
  BarChart01,
  Globe01,
  Settings01,
  Target01,
  Star01,
  Shield01,
  Code01
} from "@untitledui/icons"

export const IconMap = {
  TrendUp01,
  Users01,
  SearchLg,
  Mail01,
  InfoCircle,
  Briefcase01,
  File01,
  BarChart01,
  Globe01,
  Settings01,
  Target01,
  Star01,
  Shield01,
  Code01,
}

export type IconName = keyof typeof IconMap

export const getIcon = (iconName?: string) => {
  if (!iconName || !(iconName in IconMap)) {
    return null
  }
  return IconMap[iconName as IconName]
}