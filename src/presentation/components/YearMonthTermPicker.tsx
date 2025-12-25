import { addMonths, isBefore, startOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable } from "react-native";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Icon } from "@/presentation/components/gluestack-ui/icon";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

type YearMonthPickerProps = {
  onChange: (year: number, month: number) => void;
};

const YearMonthPicker = (props: YearMonthPickerProps) => {
  const tw = useTw();
  const { onChange } = props;

  const [date, setDate] = useState(startOfMonth(new Date()));

  const handlePrev = useCallback(() => {
    const prevDate = startOfMonth(addMonths(date, -1));
    setDate(prevDate);
    onChange(prevDate.getFullYear(), prevDate.getMonth() + 1);
  }, [date, onChange]);

  const handleNext = useCallback(() => {
    const nextDate = startOfMonth(addMonths(date, 1));
    setDate(nextDate);
    onChange(nextDate.getFullYear(), nextDate.getMonth() + 1);
  }, [date, onChange]);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const thisMonthStart = startOfMonth(new Date());

  return (
    <HStack className={cn("w-full", "justify-center", "items-center", tw.py(1), "relative")}>
      <Pressable
        onPress={handlePrev}
        className={cn("items-center", "flex-row", tw.gapX(2), "left-0", "absolute")}
        accessibilityRole="button"
      >
        <Icon as={ChevronLeft} size="xl" className="color-primary-300 bg-red-50 rounded-full" />
        <AppText t="md" className="text-secondary-700 font-bold">
          前の月
        </AppText>
      </Pressable>

      <HStack className={cn("items-center", tw.gapX(1))}>
        <Icon as={CalendarDays} size="xl" className="color-primary-500" />
        <AppText t="xl" className="text-primary-500 font-bold">{`${year}年`}</AppText>
        <AppText t="xl" className="text-primary-500 font-bold">{`${month}月`}</AppText>
      </HStack>

      {isBefore(date, thisMonthStart) && (
        <Pressable
          onPress={handleNext}
          className={cn("items-center", "flex-row", tw.gapX(2), "right-0", "absolute")}
          accessibilityRole="button"
        >
          <AppText t="md" className="text-secondary-700 font-bold">
            次の月
          </AppText>
          <Icon as={ChevronRight} size="xl" className="color-primary-300 bg-red-50 rounded-full" />
        </Pressable>
      )}
    </HStack>
  );
};

export default YearMonthPicker;
