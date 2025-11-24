import { addMonths, isBefore, startOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable } from "react-native";

import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Icon } from "@/presentation/components/gluestack-ui/icon";
import { Text } from "@/presentation/components/gluestack-ui/text";

type YearMonthPickerProps = {
  onChange: (year: number, month: number) => void;
};

const YearMonthPicker = (props: YearMonthPickerProps) => {
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
    <HStack className="w-full justify-center items-center py-1 relative">
      <Pressable
        onPress={handlePrev}
        className="items-center flex-row gap-x-2 left-0 absolute"
        accessibilityRole="button"
      >
        <Icon as={ChevronLeft} size="xl" className="color-primary-300 bg-red-50 rounded-full" />
        <Text size="md" className="text-secondary-700 font-bold">
          前の月
        </Text>
      </Pressable>

      <HStack className="items-center gap-x-1">
        <Icon as={CalendarDays} size="xl" className="color-primary-500" />
        <Text size="xl" className="text-primary-500 font-bold">{`${year}年`}</Text>
        <Text size="xl" className="text-primary-500 font-bold">{`${month}月`}</Text>
      </HStack>

      {isBefore(date, thisMonthStart) && (
        <Pressable
          onPress={handleNext}
          className="items-center flex-row gap-x-2 right-0 absolute"
          accessibilityRole="button"
        >
          <Text size="md" className="text-secondary-700 font-bold">
            次の月
          </Text>
          <Icon as={ChevronRight} size="xl" className="color-primary-300 bg-red-50 rounded-full" />
        </Pressable>
      )}
    </HStack>
  );
};

export default YearMonthPicker;
