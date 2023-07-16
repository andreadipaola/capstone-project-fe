import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { reservationsApi } from 'src/api/reservations';
import { useMounted } from 'src/hooks/use-mounted';

const emailOptions = [
  'Resend last invoice',
  'Send password reset',
  'Send verification'
];

const useEmails = () => {
  const isMounted = useMounted();
  const [emails, setEmails] = useState([]);

  const handleEmailsGet = useCallback(async () => {
    try {
      const response = await reservationsApi.getEmails();

      if (isMounted()) {
        setEmails(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleEmailsGet();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return emails;
};

export const ReservationEmailsSummary = (props) => {
  const [emailOption, setEmailOption] = useState(emailOptions[0]);
  const emails = useEmails();

  return (
    <Card {...props}>
      <CardHeader title="Emails" />
      <CardContent sx={{ pt: 0 }}>
        <TextField
          name="option"
          onChange={(event) => setEmailOption(event.target.value)}
          select
          SelectProps={{ native: true }}
          sx={{
            width: 320,
            maxWidth: '100%'
          }}
          variant="outlined"
          value={emailOption}
        >
          {emailOptions.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </TextField>
        <Box sx={{ mt: 2 }}>
          <Button
            endIcon={(
              <SvgIcon>
                <ArrowRightIcon />
              </SvgIcon>
            )}
            variant="contained"
          >
            Send email
          </Button>
        </Box>
      </CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Mail Type
            </TableCell>
            <TableCell>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email) => {
            const createdAt = format(email.createdAt, 'dd/MM/yyyy | HH:mm');

            return (
              <TableRow
                key={email.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="subtitle2">
                    {email.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  {createdAt}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};
