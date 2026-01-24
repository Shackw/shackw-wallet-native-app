import { useCallback, useState } from "react";

import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { Tab } from "@/presentation/components/Tab";
import YearMonthPicker from "@/presentation/components/YearMonthTermPicker";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import type { Token } from "@/registries/ChainTokenRegistry";
import { cn } from "@/shared/helpers/cn";
import ScreenContainer from "@mainc/ScreenContainer";

import HistoryTable from "./_components/HistoryTable";

import type { HistoryYearMonth } from "./_hooks/useHistoryRows";

const HistoryScreen = () => {
  const { currentChainDefaultToken, currentChainSupportedTokens } = useWalletPreferencesContext();

  const tw = useTw();

  const [selectedToken, setSelectedToken] = useState<Token>(currentChainDefaultToken);
  const [yearMonth, setYearMonth] = useState<HistoryYearMonth>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  });

  const handleChangeYearMonth = useCallback((year: number, month: number) => {
    setYearMonth({ year, month });
  }, []);

  return (
    <ScreenContainer className={cn("bg-white rounded-t-2xl", tw.px(3), tw.py(2))}>
      <VStack className={cn("items-center flex-1", tw.gapY(5))}>
        <Tab options={currentChainSupportedTokens} value={selectedToken} handleChange={setSelectedToken} />
        <YearMonthPicker onChange={handleChangeYearMonth} />
        <HStack className="w-full flex-1 justify-center">
          <HistoryTable token={selectedToken} yaerMonth={yearMonth} />
        </HStack>
      </VStack>
    </ScreenContainer>
  );
};

export default HistoryScreen;
