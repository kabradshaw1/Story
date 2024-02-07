package Kyle.backend.exception.user;

public class PasswordTooShortException extends RuntimeException {
  public PasswordTooShortException(String message) {
    super(message);
  }
}
