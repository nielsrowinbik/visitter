type BookingRequestsListProps = {
  requests: unknown[];
};

export function BookingRequestsList({ requests }: BookingRequestsListProps) {
  return requests.length > 0 ? (
    <div></div>
  ) : (
    <p>There are no open booking requests.</p>
  );
}
