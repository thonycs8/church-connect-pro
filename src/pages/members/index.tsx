import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MembersList } from '@/components/members/MembersList';

const MembersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('members.title')}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('members.add')}
        </Button>
      </div>
      <MembersList />
    </div>
  );
};

export default MembersPage;