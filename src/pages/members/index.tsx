import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MemberForm } from "@/components/members/MemberForm";
import { MembersList } from "@/components/members/MembersList";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const MembersPage = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    // TODO: Integrate with backend
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("members.title")}</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              {t("common.cancel")}
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              {t("members.add")}
            </>
          )}
        </Button>
      </div>

      {showForm ? (
        <div className="bg-card p-6 rounded-lg shadow">
          <MemberForm onSubmit={handleSubmit} />
        </div>
      ) : (
        <MembersList />
      )}
    </div>
  );
};

export default MembersPage;