
<?php header("Content-type: text/html; charset=utf-8"); ?>

<?php header("Access-Control-Allow-Origin: *");

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = file_get_contents('php://input');
$a = json_decode($input, true);

// echo $a;
// echo "Index 0->".$a[0].['quantidade'];
// echo $input;
// print_r($a[0]);
// var_dump($a);


// echo $sql;


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
for ($i=0;$i<count($int);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}

$req = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));


//return;
// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    if (strval($req[4]) == '') {
      // $sql = "select concat(nome,' - ', DATE_FORMAT(STR_TO_DATE(data, '%Y-%m-%d'),'%d/%m')) as aniversariante from aniversariantes order by data asc";
      $sql = "select DATE_FORMAT(STR_TO_DATE(data, '%Y-%m-%d'),'%d/%m/%Y') as data, id, valor_mao_obra, valor_orcamento, cliente, observacao from orcamentos";
      // echo $sql;
    }
    else {
      $sql = "select op.id, p.nome, op.quantidade, op.id_orcamento, op.id_produto, op.valor from orcamentosxprodutos op
      INNER join produtos p on op.id_produto = p.id
      where id_orcamento=".$req[4];
    }
    break;
    //$sql = "SELECT id,data,programacao, concat('Programação: ', programacao , ' | Data: ' , data) as prog order by data asc"; break;
  case 'PUT':
    $sql = "update `$table` set $set where id=$key";
    echo $sql;
    return;
    break;
  case 'POST':
    // $sql = "insert into `$table` (".$columns.") values (". $val.")";
    // return;
    $data = date('Y-m-d H:i:s');
    $valor_mao_obra = $a[1]['valorMaoObra'];
    $valor_orcamento = $a[2]['valorOrcamento'];
    $obs = $a[3]['observacao'];
    $cliente = $a[4]['cliente'];
    $sqlOrcamento = "INSERT INTO `orcamentos` (id,data,valor_mao_obra,valor_orcamento,cliente,observacao,status) VALUES (0,'$data',$valor_mao_obra,$valor_orcamento,'$cliente','$obs',1)";
    // echo $sqlOrcamento;
    // return;
    $result = mysqli_query($link,$sqlOrcamento);

    $id_orcamento = mysqli_insert_id($link);
    // echo $id_orcamento;
    // return;

    foreach ($a[0] as $produtos) {
      $id = $produtos['id'];
      $quantidade = $produtos['quantidade'];
      $valor = $produtos['valor'];
      $sqlFor = "INSERT INTO `orcamentosxprodutos` (id,id_orcamento,id_produto,quantidade,valor,status) VALUES (0,$id_orcamento,$id,$quantidade,$valor,1)";
      $result = mysqli_query($link,$sqlFor);
    }
      echo "sucesso";
      mysqli_close($link);
      return;
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
if ($method == 'GET' && strval($req[4]) == '' ) {
  echo '{"retorno":';

  while($resultado = mysqli_fetch_assoc($result)){
    $dados[] =  array(
    "id" => $resultado['id'],
    "data" =>  $resultado['data'],
    "valor_mao_obra"=>$resultado['valor_mao_obra'],
    "valor_orcamento"=>$resultado['valor_orcamento'],
    "cliente"=>$resultado['cliente'],
    "observacao"=>$resultado['observacao'],
    );
    //echo $dados;
  }

echo json_encode($dados,JSON_UNESCAPED_UNICODE);

echo '}';
} elseif (strval($req[4]) != ''){
  echo '{"retorno":';

    while($resultado = mysqli_fetch_assoc($result)){
      $dados[] =  array(
      "id" => $resultado['id'],
      "nome" => $resultado['nome'],
      "id_orcamento" =>  $resultado['id_orcamento'],
      "id_produto"=>$resultado['id_produto'],
      "quantidade"=>$resultado['quantidade'],
      "valor"=>$resultado['valor'],
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


