
<?php header("Content-type: text/html; charset=utf-8"); ?>

<?php header("Access-Control-Allow-Origin: *");

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = file_get_contents('php://input');
$a = json_decode($input, true);

$link = mysqli_connect('localhost', 'alpha_sys', 'alpha123');
$dbname = 'alpha_sys';
mysqli_set_charset($link,'utf8');

$db = mysqli_select_db($link,$dbname);

// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;


$val =  "'".$_POST['descricao']."'";
$columns = 'nome,descricao,valor,quantidade';

$set = '';
for ($i=0;$i<count($input);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}


//return;
// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    // $sql = "select concat(nome,' - ', DATE_FORMAT(STR_TO_DATE(data, '%Y-%m-%d'),'%d/%m')) as aniversariante from aniversariantes order by data asc";
    $sql = "select * from produtos";
    // echo $sql;
    break;
    //$sql = "SELECT id,data,programacao, concat('Programação: ', programacao , ' | Data: ' , data) as prog order by data asc"; break;
  case 'PUT':
    $sql = "update `$table` set $set where id=$key"; break;
  case 'POST':
    // $sql = "insert into `$table` (".$columns.") values (". $val.")";
    // return;
    $sql = sprintf(
      "INSERT INTO `$table` (%s) VALUES ('%s');",
      implode(',', array_keys($a)),
      implode("','", array_values($a))
    );
    break;
  case 'DELETE':
    $sql = "delete `$table` where id=$key"; break;
}

$result = mysqli_query($link,$sql);

// echo $columns,$sql;
//return;

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysql_error($link));
}

// print results, insert id or affected row count
if ($method == 'GET') {
  echo '{"retorno":';

  while($resultado = mysqli_fetch_assoc($result)){
    $dados[] =  array(
    "nome" => $resultado['nome'],
    "descricao"=>$resultado['descricao'],
    "valor"=>$resultado['valor'],
    "quantidade"=>$resultado['quantidade'],
    );
    //echo $dados;
  }

echo json_encode($dados,JSON_UNESCAPED_UNICODE);

echo '}';
} elseif ($method == 'POST') {
  echo mysqli_insert_id($link);
} else {
  echo mysqli_affected_rows($link);
}

// close mysql connection
mysqli_close($link);


