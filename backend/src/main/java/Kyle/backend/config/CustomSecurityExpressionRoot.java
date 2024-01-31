package Kyle.backend.config;

import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;

public class CustomSecurityExpressionRoot extends SecurityExpressionRoot implements MethodSecurityExpressionOperations {

  private Object filterObject;
  private Object returnObject;
  private Object target;

  public CustomSecurityExpressionRoot(Authentication authentication) {
    super(authentication);
  }

  public boolean isAdmin() {
    // Implement your custom logic to check if the user is an admin
    return true;
  }

  @Override
  public void setFilterObject(Object filterObject) {
    this.filterObject = filterObject;
  }

  @Override
  public Object getFilterObject() {
    return filterObject;
  }

  @Override
  public void setReturnObject(Object returnObject) {
    this.returnObject = returnObject;
  }

  @Override
  public Object getReturnObject() {
    return returnObject;
  }

  @Override
  public Object getThis() {
    return this.target;
  }

  // If you have a setter for 'this' target, you can implement it as well
  public void setThis(Object target) {
    this.target = target;
  }
}
