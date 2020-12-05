import java.util.Arrays;

public class Hello {
  public static void main(String[] args) {
    System.out.println("java版本号：" + System.getProperty("java.version"));

    char z = 'z';
    char ch = '中';
    System.out.println(z);
    System.out.println(ch);

    StringBuilder str = new StringBuilder("Test String");
    System.out.println(str);
    // TODO 找不到符号
    // var str = new StringBuilder("Test String");
    // System.out.println(str);

    // TODO 语法错误
    // String mstr = """
    //               String Builder is String Builder
    //                 xxx - xxx
    //                   May Be Not ????
    //               But,
    //               """;
    // System.out.println(mstr);

    int[] intArr = new int[] { 45, 32, 54, 32, 64 };
    int[] intArr2 = { 1, 2, 3, 4, 5 };
    System.out.println(Arrays.toString(intArr));
    System.out.println(Arrays.toString(intArr2));
    System.out.println(String.join(",", new String[] { "Apple", "Juice" }));
    System.out.printf("%%s: %s\n", intArr);

    String fruit = "apple";
    switch (fruit) {
      case "apple":
        System.out.println("[PASS]: Get!");
        break;
      default:
        System.out.println("[ERR]: Fruit not found");
        break;
    }
    // Boolean isGet = switch (fruit) {
    //   case "apple" -> 1;
    //   default -> 0;
    // }

    for (int n : intArr) {
      System.out.println(n);
    }

    double pi = 0;
    boolean isNeg = false;
    for (int i = 1; i < 9999999; i += 2) {
      pi += (1.0 / i) * (isNeg ? 1 : -1);
      isNeg = !isNeg;
    }
    System.out.println(-4 * pi);

    System.out.println("asdf".hashCode());
    System.out.println("asdf".hashCode());

    System.out.println(Boolean.parseBoolean("TRUE"));
  }
}