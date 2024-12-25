
import { Container, Typography, Card, CardContent, Avatar } from "@mui/material";
import { useSessionStore } from "../store/useSessionStore";

const UserInfo = () => {
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return (
      <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
        <Typography variant="h6" color="error">
          사용자 정보가 없습니다. 로그인이 필요합니다.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Card style={{ padding: "1.5rem", textAlign: "center" }}>
        <Avatar
          alt={user.name}
          src="https://via.placeholder.com/150"
          sx={{ width: 80, height: 80, margin: "0 auto", marginBottom: "1rem" }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: {user.email}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserInfo;
