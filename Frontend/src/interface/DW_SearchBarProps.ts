export default interface DW_SearchBarProps {
    filters: {
      nickname: string;
      seniority: string;
      hourly_rate: string;
      area: string[];
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAreaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}