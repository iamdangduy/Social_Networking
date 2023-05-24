export function GetCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function SetCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function NumberFormat(num, joinChar = ",") {
  try {
    const numString = num + "";
    var numberPart = numString.split(".");
    var s = numberPart[0];
    var arr = [];
    while (s.length > 0) {
      if (s.length > 3) {
        arr.push(s.slice(s.length - 3, s.length));
        s = s.slice(0, s.length - 3);
      } else {
        arr.push(s);
        s = "";
      }
    }
    return (
      arr.reverse().join(joinChar) +
      (numberPart.length > 1 ? "." + numberPart[1] : "")
    );
  } catch (ex) {
    return "";
  }
}

export const ConvertTime = function (date) {
  // 👇️ Formatted as MM/DD/YYYY hh:mm:ss
  const [dateComponents] = date.split(" ");
  const [year, month, day] = dateComponents.split("-");
  const date1 = new Date(year, month - 1, day);
  // ✅ Get timestamp
  const timestamp = date1.getTime();
  return timestamp;
};

export const ConvertDateTime = function (long) {
  const timestamp = long;
  const date = new Date(timestamp);
  let newDate = `${date
    .toLocaleDateString("en-GB")
    .toString()
    .slice(6, 10)}-${date
    .toLocaleDateString("en-GB")
    .toString()
    .slice(3, 5)}-${date.toLocaleDateString("en-GB").toString().slice(0, 2)}`;
  return newDate;
};

export const linkBackend = "https://localhost:44395";
