import { endOfMonth, startOfMonth } from "date-fns";
import { useState } from "react";

import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import YearMonthTermPicker from "@/components/YearMonthTermPicker";
import { Token, TOKENS } from "@/registries/TokenRegistry";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import HistoryTable from "./_components/HistoryTable";

import type { HistoryTerm } from "./_hooks/useHistoryRows";

const HistoryScreen = () => {
  const [selectedToken, setSelectedToken] = useState<Token>("JPYC");
  const [term, setTerm] = useState<HistoryTerm>({
    timeFrom: startOfMonth(new Date()),
    timeTo: endOfMonth(new Date())
  });

  const handleTermChange = (from: Date, to: Date) => {
    setTerm({ timeFrom: from, timeTo: to });
  };

  return (
    <ScreenContainer className="bg-white rounded-t-[12px] px-[12px] py-[8px]">
      <VStack className="gap-y-5 items-center flex-1">
        <Tab options={TOKENS} value={selectedToken} handleChange={setSelectedToken} />
        <YearMonthTermPicker onChange={handleTermChange} />
        <HStack className="w-full flex-1 justify-center">
          <HistoryTable token={selectedToken} term={term} />
        </HStack>
      </VStack>
    </ScreenContainer>
  );
};

export default HistoryScreen;
