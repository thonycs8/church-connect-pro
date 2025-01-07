import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Member } from '@/types/member';

const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@example.com',
    phone: '+351912345678',
    address: {
      street: 'Rua Principal',
      number: '123',
      parish: 'Santa Maria',
      county: 'Lisboa',
      district: 'Lisboa',
      postalCode: '1000-001',
      country: 'Portugal'
    },
    birthDate: '1990-01-01',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

export const MembersList = () => {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('members.form.firstName')}</TableHead>
            <TableHead>{t('members.form.lastName')}</TableHead>
            <TableHead>{t('members.form.email')}</TableHead>
            <TableHead>{t('members.form.phone')}</TableHead>
            <TableHead>{t('members.form.status')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.firstName}</TableCell>
              <TableCell>{member.lastName}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>{member.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};